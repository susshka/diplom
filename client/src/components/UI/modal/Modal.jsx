import React from 'react';
import classes from "./Modal.module.css"

const Modal = ({children, visible, setVisible}) => {

    const rootClasses = [classes.Modal] /*по умолчанию в массиве есть стиль для отключенного модального окна */

    if(visible){
        rootClasses.push(classes.active);
    } /*если при проверке пропсов оказалось, что видимость окна в true, добавляется стиль для отображения модального окна */

    return (
        /*через join соеденяются два стиля (?), если(!) в rootClasses два стиля */
        <div className={rootClasses.join(" ")} onClick = {() => setVisible(false)}> {/*При нажатии на этот див должено убираться*/}
            <div className={classes.ModalContent} onClick = {(e) => e.stopPropagation()}> 
            {/*stopPropagetion нужно, чтобы при нажати на область внутри модального окна, оно не закрывалось, как бы запрет на действие для этого сегмента по клику */}
                {children}
            </div>
        </div>
    );
};

export default Modal;