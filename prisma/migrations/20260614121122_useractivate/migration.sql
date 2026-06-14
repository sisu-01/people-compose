-- 1. activate 컬럼을 추가하면서 기존 데이터에는 일괄적으로 true(또는 false)를 채움
ALTER TABLE "User" ADD COLUMN "activate" BOOLEAN NOT NULL DEFAULT true;

-- 2. 앞으로는 기본값이 자동 적용되지 않도록 DEFAULT 속성만 제거 (schema.prisma 설정과 일치시킴)
ALTER TABLE "User" ALTER COLUMN "activate" DROP DEFAULT;