// import { Modal } from '../../context/Modal';
import { Modal } from '../../context/Modal'
import { useState } from 'react';
import PostDetailComponent from '../PostDetailComponent/PostDetailComponent'


const MainModal = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <img src={post?.photo_url}
        alt="" onClick={() => setShowModal(true)}></img>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <PostDetailComponent post={post} hideModal={() => setShowModal(false)} />
          </div>
        </Modal>
      )}
    </>
  )
}

export default MainModal;
