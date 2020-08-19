variable "region" {
  default = "us-east-1"
}

variable "profile" {
  default = "syneaws"
}

variable "applicationname" {
  default = "app"
}

provider "aws" {
  profile = var.profile
  region  = var.region
}

resource "aws_security_group" "ec2security" {
  name = "${var.whoami}_ec2_security_grp"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-xenial-16.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"]
}


resource "aws_instance" "web_server" {
  ami             = data.aws_ami.ubuntu.id
  instance_type   = "t2.micro"
  key_name        = "${var.whoami}_key"
  security_groups = ["${aws_security_group.ec2security.name}"]

  tags = {
    Name        = "${var.whoami}_ec2_instance"
    Environment = "production"
  }
}


resource "null_resource" "createversionfolders" {

  triggers = {
    always_run = "${timestamp()}"
  }

  provisioner "remote-exec" {
    inline = [
      "mkdir /tmp/${var.codeversion}",
      "chmod 755 -R /tmp/${var.codeversion}"
    ]
  }

  connection {
    type        = "ssh"
    host        = aws_instance.web_server.public_ip
    user        = "ubuntu"
    private_key = file(var.private_key)
  }

  depends_on = [aws_instance.web_server]

}

resource "null_resource" "movelocalfilestoremote" {

  triggers = {
    always_run = "${timestamp()}"
  }

  provisioner "file" {
    source      = "server-install.sh"
    destination = "/tmp/${var.codeversion}/server-install.sh"
  }

  provisioner "file" {
    source      = "Dockerfile"
    destination = "/tmp/${var.codeversion}/Dockerfile"
  }

  provisioner "file" {
    source      = "docker-compose.yml"
    destination = "/tmp/${var.codeversion}/docker-compose.yml"
  }

  provisioner "file" {
    source      = "src"
    destination = "/tmp/${var.codeversion}/"
  }

  provisioner "file" {
    source      = "package.json"
    destination = "/tmp/${var.codeversion}/package.json"
  }

  provisioner "file" {
    source      = "package-lock.json"
    destination = "/tmp/${var.codeversion}/package-lock.json"
  }


  connection {
    type        = "ssh"
    host        = aws_instance.web_server.public_ip
    user        = "ubuntu"
    private_key = file(var.private_key)
  }

  depends_on = [aws_instance.web_server, null_resource.createversionfolders]

}

resource "null_resource" "runinstaller" {

  triggers = {
    always_run = "${timestamp()}"
  }

  provisioner "remote-exec" {
    inline = [
      "chmod 755 -R /tmp/${var.codeversion}",
      "bash /tmp/${var.codeversion}/server-install.sh",
    ]
  }

  connection {
    type        = "ssh"
    host        = aws_instance.web_server.public_ip
    user        = "ubuntu"
    private_key = file(var.private_key)
  }

  depends_on = [
    aws_instance.web_server,
    null_resource.createversionfolders,
    null_resource.movelocalfilestoremote
  ]
}

resource "null_resource" "runapp" {

  triggers = {
    always_run = "${timestamp()}"
  }

  provisioner "remote-exec" {
    inline = [
      "cd /tmp/${var.codeversion}",
      "npm install",
      "sudo curl -L \"https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose",
      "sudo mv /usr/local/bin/docker-compose /usr/bin/docker-compose",
      "sudo chmod +x /usr/bin/docker-compose",
      "cd /tmp/${var.codeversion}",
      "sudo docker-compose down",
      "sudo docker-compose build",
      "sudo docker-compose up"
    ]
  }

  connection {
    type        = "ssh"
    host        = aws_instance.web_server.public_ip
    user        = "ubuntu"
    private_key = file(var.private_key)
  }

  depends_on = [
    aws_instance.web_server,
    null_resource.createversionfolders,
    null_resource.movelocalfilestoremote,
    null_resource.runinstaller
  ]
}


output "image_id" {
  value = data.aws_ami.ubuntu.id
}

output "ssh_to_ec2" {
  value = "ssh -i /Users/ravijeet/.ssh/id_snakeeyes.pem ubuntu@${aws_instance.web_server.public_dns}"
}

output "open_in_browser" {
  value = "http://${aws_instance.web_server.public_dns}/api/v1/healthcheck"
}
