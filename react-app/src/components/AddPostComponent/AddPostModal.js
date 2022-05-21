import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddPostComponent from './AddPostComponent'
import add_post_icon from '../../images/New_Post.png'

const AddPostModal = () => {
  return (
    <>
      <Popup
        trigger={<img src={add_post_icon} alt="Add post" />}
        modal
        nested>
        {close => (
          <div className="modal">
            <div className="header"> Add Post: </div>
            <div className="content">
              <AddPostComponent close={close} />
            </div>
          </div>
        )}
      </Popup>
    </>
  )
}

export default AddPostModal;
