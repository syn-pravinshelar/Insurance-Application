# Insurance-Application

================================================================================

## Application Setup

================================================================================

### Prerequisite

- You will need docker installed on your machine to run code locally
- You will need Node installed on your machine
- You will need putty or command line to generate SSH keys for code deployment to AWS (For remote deployment)

---

### Creating keys (For remote deployment)

- You will need to create a SSH key to log into the ec2 instance
- Navigate to your .ssh folder (or wherever you keep ssh keys). And use below command to create your keys
  > ssh-keygen -o
- Rename secret-sample.tf1 to secret.tf
- Replace your public key content in the secret.tf
  > public_key = "ssh-rsa AAAAB3NzaC1y......"
- You can also change whoami to any name you want. No spaces, dashes, underscores

---

### Installing AWS CLI and configuring access (For remote deployment)

1.  For Mac download from : https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html
2.  Verify your installation using : https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html#cliv2-mac-install-confirm
3.  AWS credentials configured locally
    - Go to AWS Console
    - Under your name you ll see "My Security Credentials"
    - Once that opens, create a new Key (Save the Access Key and Secret key to aws_credentials.text. This file is ignored in GIT, so it will not be committed)
    - Run on terminal: aws configure --profile syneaws
    - You ll have to fill in below data
    1.  AWS Access Key ID [None]:
    2.  AWS Secret Access Key [None]:
    3.  Default region name [None]: us-east-1
    4.  Default output format [None]: text
    - Verification via console: cd ~/.aws
    - There should be config and credentials file in there

---

### Installing Terrafom (For remote deployment)

1. Download Terraform to downloads directory from : https://www.terraform.io/downloads.html
2. unzip it
3. Move that binary to inside of any folder mentioned in your PATH variable
   - mv ~/Downloads/terraform /usr/local/bin/
4. Test if the binary works from command line : terrafom -help

---

### Deploying and Destroying the infrastructure components via terraform (For remote deployment)

1. To validate `terraform validate`
2. To create the plan `terraform plan`
3. To deploy `terraform apply -auto-approve`
4. To destroy `terraform destroy -auto-approve`

---

### Executing on browser on local

The recommended way to run this app on local is

> docker-compose build
> docker-compose up

Any change you make in code is reflected with nodemon applying changes to docker

You can now access the app at http://localhost/

To delete any previous build run below command

> docker-compose down

---

### Executing on browser on remote

1. Deploy using terraform

   > terraform apply -auto-approve

2. Once your terraform script finishes executing it should output the aws public dns healthcheck link

e.g

```
Apply complete! Resources: 4 added, 0 changed, 4 destroyed.

Outputs:

image_id = ami-0b8e1098c31133b85
open_in_browser = http://ec2-54-86-139-72.compute-1.amazonaws.com/healthcheck
ssh_to_ec2 = ssh -i /Users/ravijeet/.ssh/id_snakeeyes.pem ubuntu@ec2-54-86-139-72.compute-1.amazonaws.com
```

================================================================================

## Application Architecture

================================================================================

The application is simple a single EC2 instance loading with Ubuntu and running Docker with Node and Mongo built in

================================================================================

## Application Standards

================================================================================

Linting and Prettier is added for code quality check with airbnb standards.
If you want to bypass pre-commit hook for linting errors use below

> git commit --no-verify -m "your commit message"
