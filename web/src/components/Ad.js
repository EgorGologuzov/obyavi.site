import Header from "./Header";
import Subcaption from "./Subcaption";
import Switch from "./Switch";
import Avatar from "./Avatar";
import StarsBar from "./StarsBar";

const Ad = ({img,title,description,checked,user,price,onTitleClick,onAvatarClick}) => {
    return ( 
        <div className="ad">
            <div className="ad__img-presenter" style={{gridRow:'span 2'}}>
                                    <img src={img} style={{width:'250px',height:'250px',borderRadius:'10%'}}/>
                                </div>
                                <div className="ad__text-info">
                                    <Header level={1} onClick={onTitleClick}>{title}</Header>
                                    <Subcaption level={2}>{user.location}</Subcaption>
                                    <Subcaption level={1} color={'text'}>{description}</Subcaption>
                                    <Header level={3} color={'text'}>{price} руб.</Header>
                                </div>
                                <Switch checked={checked}/>
                                <div className="ad__user-info">
                                    <Avatar src={user.avatar} onClick={onAvatarClick}/>
                                    <div className="ad__user-info__c2">
                                        <Header level={5}>{user.firstname} {user.lastname}</Header>
                                        <div className="ad__user-info__c2__r2">
                                            <StarsBar input_mode={false} value={user.rating}/>
                                            <Subcaption level={2} color={'secondary'}>Отзывы</Subcaption>
                                        </div>
                                    </div>
                                </div>
                            </div>
    );
}
 
export default Ad;