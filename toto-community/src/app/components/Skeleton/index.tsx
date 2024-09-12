const Skeleton = () => {
    return (
      <div className="animate-pulse space-y-4">
        {/* 스켈레톤 헤더 */}
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        
        {/* 스켈레톤 본문 */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
  
        {/* 스켈레톤 버튼 */}
        <div className="h-8 bg-gray-300 rounded w-1/5"></div>
      </div>
    );
  };
  
  export default Skeleton;
  