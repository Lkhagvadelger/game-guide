# 1Tseg

kill -9 $(lsof -ti:3000,3001) 

gmail api config

asd
https://accounts.google.com/o/oauth2/auth?client_id=&redirect_uri=0&response_type=code&scope=https://mail.google.com/&access_type=offline


curl --request POST --data "code=&client_id=&client_secret=&redirect_uri=&grant_type=authorization_code" https://oauth2.googleapis.com/token


Category parent update query

UPDATE "Category" t1
SET "parentCategoryId" = t2."id"
FROM "Category" t2
WHERE t1."oldParent" = t2."oldRealId"




https://github.com/bulgariamitko/flutterflowtutorials/blob/main/Custom%20Widgets/byte-to-img.dart