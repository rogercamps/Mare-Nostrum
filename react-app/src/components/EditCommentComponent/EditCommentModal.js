import Popup from 'reactjs-popup';
import comment_icon from '../../images/ig_comment.png';
import EditCommentComponent from './EditCommentComponent';

const EditCommentModal = ({ updateComment }) => {



  return (
    <>
      <Popup trigger={<img src={comment_icon} alt="edit post" className="edit-comment-icon" />} modal>
        {close => (
          <div className="modal">
            <div className="content">
              <EditCommentComponent updateComment={updateComment} close={close} />
            </div>
          </div>
        )}
      </Popup>
    </>
  )
}


export default EditCommentModal;
