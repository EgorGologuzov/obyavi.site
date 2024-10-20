import React from 'react';
import Paragraf from './Paragraf';
import Header from './Header';
import Spliter from './Spliter';

const NotificationList = ({ notifications, removeNotification }) => {
    return (
        <div className="popup-list">
            {notifications.map((notification, index) => (
                <div key={index} className={`popup popup_${notification.level}`}>
                    <div className="popup__content">
                        <Header level="5">{notification.caption}</Header>
                        <Paragraf fontSize='small'>{notification.text}</Paragraf>
                        <Spliter height="5px"/>
                        {notification.buttons && notification.buttons.map((button) => 
                            <span key={index} className="popup__btn" 
                                onClick={() => {removeNotification(index); button.onClick && button.onClick()}}>
                                {button.text}
                            </span>
                        )}
                        <span 
                            className="popup__btn" 
                            onClick={() => removeNotification(index)}>
                            Закрыть
                        </span>
                    </div>
                    <div className="popup__icon">
                        <span>{
                            notification.level == "common" ? "!" 
                            : notification.level == "important" ? "!!" 
                            : notification.level == "critical" ? "!!!"
                            : ""}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
