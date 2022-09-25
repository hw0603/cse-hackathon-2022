# 2022 대구를 빛내는 해커톤 

## 팀 이름
창의력부족

## 제출 세션 및 주제
특별세션 - 주민 참여 방법(수단) 부족

## 프로젝트 한 줄 설명
생활 속의 불편함들을 지역별로 간편히 건의할 수 있는 서비스

## 프로젝트에 대한 설명
국민권익위원회에 따르면 2022년 현재 대구광역시의 연간 민원 신청 접수 건은 약 38만건으로, 인구 수 대비 민원 신청률이 광역시 중 하위권을 기록하고 있습니다.  
  
이를 단순히 대구가 타 도시 대비 민원 거리가 없는 살기 좋은 도시라는 관점에서 접근하기보다는, 생활 속의 크고 작은 불편함들을 '그냥 참고 살 만 해서', 혹은 '민원 신청 과정이 복잡하고 귀찮아서'와 같은 다양한 이유로 인해 직접적인 민원 신청까지 이어지지 못하는 것으로 판단했습니다.  
  
이에 대구형 위치 기반 제언 관리 시스템을 구축하여 대구 시민의 직접적인 의견 공유와 제언 작성을 장려하고, 해당 제언들을 지자체에서 간편하게 수합하고 처리할 수 있는 장을 마련하여 궁극적으로 시민 전체의 삶의 질 향상에 발돋움하고자 합니다.  
  
<img width="1366" alt="image" src="https://user-images.githubusercontent.com/31981462/192132083-13868aef-c18a-4878-a305-07947c90c9f8.png">
  
<img width="1366" alt="image" src="https://user-images.githubusercontent.com/31981462/192131994-e367812b-d315-4448-bae0-354e3973d4c5.png">
  
<img width="1366" alt="image" src="https://user-images.githubusercontent.com/31981462/192132052-c0a1a97b-3b43-48e5-8a19-1bf427e6b40d.png">

![image](https://user-images.githubusercontent.com/42796979/192133476-106f8928-b1f8-4a34-b4f9-6d595701ff24.png)



시민들은 `구/군`, `동` 별로 분리된 게시판에 본인의 제언을 간단하게 작성하며 딱딱하게만 느껴졌던 기존의 민원 접수 형태에서 벗어나 생활 속의 사소한 불편함까지도 간단하게 자신의 생각과 건의사항을 정리하여 글을 남길 수 있으며, 제언 작성 기능과 제언 게시글 내의 찬반 투표 기능을 통해 서로의 생각을 공유하고 직/간접적으로 관련 정책 마련에 참여할 수 있습니다.  
지자체 입장에서는 전화나 오프라인 대면과 같은 형태로 악성 민원인들을 상대하는 일이 비교적 줄어들 것이고, 정책 수립 시 놓치고 있었던 부분이나 개선점들을 많은 인력을 사용하지 않고 효과적으로 관리할 수 있을 것입니다.  
  
본 플랫폼이 자리를 잡고 잘 운영된다면, 지자체와 시민 의견의 간극을 메우고 지속적으로 정책 수립이나 민원 처리를 개선해 나가는 과정 속에서, 대구광역시는 시민들의 사소한 의견 하나하나를 소중하게 생각하고 시민들이 그것을 체감할 수 있는 살기 좋은 도시로 거듭날 것으로 기대됩니다.

## 프로젝트에 활용된 기술
<img width="1366" alt="image" src="https://user-images.githubusercontent.com/31981462/192133132-dfd8db5a-d2af-4ea9-8481-0d85f665b0ad.png">

### 프론트 엔드
UI 설계를 위한 Javascript 라이브러리인 `React`를 사용해서 대부분의 설계를 구현하였습니다.
- `React` 내부에서는 `useContext`, `useState`, `useEffect` 등 유용하게 사용할 수 있는 Hook을 사용하였습니다.
- `SPA (Single Page Application)` 구현을 위해 `react-router-dom`을 사용하였고, 내부 기능인 `BrowerRouter`, `Routes`, `Route`, `Link` 등을 사용해, 애플리케이션 사용 시 로딩을 줄여 편의성을 높였습니다.

서버와의 통신에는 `axios`를 사용하였고 로그인 정보를 `JWT (JSON Web Token)`으로 관리합니다.

`Bootstrap`을 이용해 `margin`, `padding`, `display`, 또는 버튼 디자인, 테이블 디자인 등의 사소한 CSS 적용사항들을 편리하게 적용하였고, `Font awesome`을 이용해 간단한 아이콘들을 삽입하였습니다.

회원가입 시 `navigator.geolocation` 객체로 추출한 사용자의 위도/경도와 구글 맵 API를 활용해 위치를 추적하여, 사용자의 위치(구/군, 읍/면/동 정보)를 얻을 수 있습니다.

### 백 엔드
Spring Boot
- Spring Boot Actuator
- Spring Web
- Spring Data JPA
- Rest Repositories
- Rest Repositories HAL Explorer
- Thymeleaf
- Spring Security
- H2 Database
- MySQL Driver
- Lombok
- Spring Boot DevTools
- Spring Configuration Processor

## 시연 영상
유튜브 링크(https://youtu.be/N1TDp40lNv0).
