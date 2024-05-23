#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# переход в каталог сборки
cd dist

# если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# если вы публикуете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>


# # abort on errors 
# set -e 

# # build 
# echo Linting.. 
# npm run lint 
# echo Building. this may take a minute... 
# npm run build 

# # if you are deploying to a custom domain add a CNAME (uncomment the next 3 lines) 
# #cd docs 
# #echo 'yourcustomdomain.com' > CNAME 
# #cd - 

# # deploy 
# echo Deploying.. 
# git add -A 
# git commit -m 'deploy' 


 git push -f https://mikhailpermiakov.github.io/test-for-befit/

# git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
