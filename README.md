
만들어 볼 기능
출석부
룰렛
스포츠 일정?
---------------------------------------
수정해야할 기능
채팅 보낼땐 시간이 안나오는 부분


### Next 13+
- Next 13버전 이상부터는 App Router를 사용하는데 기존의 Pages폴더와는 약간 다른 차이가 있음
- 1. App 디렉토리 내에서는 Next/router 가 아닌 Next/Navigation을 사용 해야함
- 2. 모든 페이지는 Page.tsx 모든 레이아웃은 Layout.tsx로 고정임
- 3. getStaticProps / getServerSideProps 등 이런게 데이터를 페칭 하는걸로 변경 됨
- 4. 따라서 데이터 요청이나 데이터 관리가 필요해서 React Hook을 사용해야한다면 컴포넌트로 따로 빼서 진행해야하고 "use client" 최상위의 작성 해줘야함
- 5. app/api 를 사용해서 프론트에서 API서버를 만들 수 있음 (나는 사실 제대로 사용은 안했지만 채팅때문에 백엔드 서버가 필요했던 상황이라) api 디렉토리만 만들고 Prisma 대신 백엔드 서버와 연결해서 진행함
- 6. use client 작성된 컴포넌트에서는 async / await 사용할 수 없기 때문에 React Query 또는 다른 비동기 패칭 라이브러리를 사용해야 한다. 아니면 useEffect를 통해서 받아와야함
- 7. 서버 컴포넌트에서 클라이언트 컴포넌트를 호출할 때는 dynamic으로 하는게 좋음
### React Qurey 5+
- useQueryClient 이거는 클라이언트용 / getQueryClient()로 new QueryClient()생성해서 사용하고있는데 이게 SSR 방식임


### Next auth 사용

###### Prisma라는 라이브러리를 통해 Front에서 백엔드와 DB연결을 진행할 수 있음 Next-auth뿐만 아니라 데이터도 다양하게 받아오면 됨

- npm i next-auth@beta path-to-regexp 
- npx auth secret => 자동으로 환경변수 생성함(.env.local)

###### 기본 구성
- handlers 프로젝트의 인증 관리를 위한 API라이트(get, post) 객체
- signin - 로그인 시도 비동기 함수
- signout - 로그아웃 비동기 함수
- auth - 세션 정보를 반환하는 비동기 함수
- unstable_update(update): 세션 정보를 갱신하는 비동기 함수입니다.

### Next 환경 변수
Next.js에서 클라이언트에서 환경 변수를 사용하려면
process.env.WEB_SOCKET_URL 이런식이 아니라
process.env.NEXT_PUBLIC 으로 시작해야함

### React Query 5+
- React Query는 데이터 상태 관리 툴이며 Context API사용법이 유사하다. Provider를 통해 데이터를 공유함
- React Query에서는 QueryProvider내에서 QueryClient 인스턴스를 공유한다.

###### 주요 기능
- 쿼리 무효화(invalidateQueries) : 서버에서 데이터가 변경되면 변경된 데이터를 가져와야 할 때 invalidateQueries()를 사용해 특정 쿼리를 무효화함
- 캐시된 데이터 설정 서버로부터 새로운 데이터를 가져오지 않고, 클라이언트 측에서 캐시된 데이터를 직접적으로 업데이트할 때 queryClient.setQueryData()를 사용

========================================================================================================================================================

# Nest.js

파라미터 받을 때 주의사항

@Body('id') id: string => Request.Body데이터에서 name필드가 "id"인것을 찾아서 주고
@Body() id: string => 이건 말 그대로 request.body데이터만 받아오니 잘 확인해서 사용해햐함
