import { toast } from "react-hot-toast";

const ConfirmToast = () => {
  toast.custom((t) => (
    <div className={`bg-white p-4 shadow-lg rounded-lg ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
      <div>정말 이 작업을 진행하시겠습니까?</div>
      <div className="flex justify-end mt-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            // 확인 버튼 클릭 시 수행할 작업
            toast.dismiss(t.id);
            alert("확인되었습니다.");
          }}
        >
          확인
        </button>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-lg ml-2"
          onClick={() => toast.dismiss(t.id)}
        >
          취소
        </button>
      </div>
    </div>
  ));
};

export default ConfirmToast;

