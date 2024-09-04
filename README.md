
Next auth 사용

npm i next-auth@beta path-to-regexp 

npx auth secret => 자동으로 환경변수 생성함(.env.local)

기본 구성
handlers 프로젝트의 인증 관리를 위한 API라이트(get, post) 객체
signin - 로그인 시도 비동기 함수
signout - 로그아웃 비동기 함수
auth - 세션 정보를 반환하는 비동기 함수
unstable_update(update): 세션 정보를 갱신하는 비동기 함수입니다.

/api/auth/[...nextauth]/route.ts 이런식으로 Front단에서도 백엔드 api 서버를 만들 수 있음

단 Prisma라는 걸 통해서 DB에 넣는 작업을 하는데 어느정도 괜찮기는 한데 큰 규모는 불가능

Next.js에서 클라이언트에서 환경 변수를 사용하려면
process.env.WEB_SOCKET_URL 이런식이 아니라
process.env.NEXT_PUBLIC 으로 시작해야함

Nest.js에서

파라미터 받을 때 주의사항

@Body('id') id: string => Request.Body데이터에서 name필드가 "id"인것을 찾아서 주고
@Body() id: string => 이건 말 그대로 request.body데이터만 받아오니 잘 확인해서 사용해햐함
