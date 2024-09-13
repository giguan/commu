interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    content: any;
  }
  

const Modal: React.FC<ModalProps> = ({isOpen, onClose, onConfirm, title, content}) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full">
          <h2 className="text-lg font-bold text-black">{title}</h2>
          <p className="mt-4 text-black">{content}</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-black rounded-md">
              취소
            </button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md">
              삭제
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;