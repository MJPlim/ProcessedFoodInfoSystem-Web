import {AiOutlineStar,AiFillStar} from "react-icons/ai";
import "./NoFavourite.scss";
const  NoFavourite=()=>{
    return (
        <div className="page">
            <AiOutlineStar className="icon" size="100"></AiOutlineStar>
            <div className="content">
                <h1 className="title"> 즐겨찾기가 없습니다 </h1>
                <div className="check">
                <div className="checklist"><AiFillStar size="20"></AiFillStar> 관심있는 음식에 별 버튼을 클릭해보세요</div>
                </div>
            </div>
        </div>
    );
}
export default NoFavourite;