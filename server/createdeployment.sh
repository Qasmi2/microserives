aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 771794352313.dkr.ecr.us-east-2.amazonaws.com
docker build -t gateway:1.0.0 .
docker tag gateway:1.0.0 771794352313.dkr.ecr.us-east-2.amazonaws.com/gateway:1.0.0
docker push 771794352313.dkr.ecr.us-east-2.amazonaws.com/gateway:1.0.0
