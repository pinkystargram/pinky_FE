// Action :: 이 모듈에서 일어날 수 있는 액션

// Action Creator :: 액션을 만들어 주는 애 (액션은 반드시 'type'과 'payload'를 가진 객체다.)

// Initial State :: 이 모듈의 스토어 초기 값을 설정해주는 애
// const initialState =

// Reducer : 액션 받아서 액션에 따라 스토어 값을 바꿔주는 애
const post = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// reducer를 내보낸다
export default post;
