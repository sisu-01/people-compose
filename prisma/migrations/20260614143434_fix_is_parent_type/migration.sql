-- 1. isAdmin 컬럼 삭제
ALTER TABLE "User" DROP COLUMN "isAdmin";

-- 2. 기존 isParent에 걸려있을지 모르는 기본값(Default)을 먼저 제거합니다.
ALTER TABLE "User" ALTER COLUMN "isParent" DROP DEFAULT;

-- 3. NULL 허용 및 타입 변환 수행
ALTER TABLE "User" ALTER COLUMN "isParent" DROP NOT NULL;
ALTER TABLE "User" ALTER COLUMN "isParent" TYPE INTEGER USING (CASE 
    WHEN "isParent" = true THEN 1 
    WHEN "isParent" = false THEN 0 
    ELSE NULL 
END);

-- 이제 완료되었습니다. (NOT NULL을 추가하지 않았으므로 null이 허용됩니다.)