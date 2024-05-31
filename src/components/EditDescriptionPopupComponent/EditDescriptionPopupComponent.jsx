import { useState } from "react";
import { updateFavDescription } from "../../slices/favSlice";
import { useDispatch } from "react-redux";
import "./EditDescriptionPopupComponent.css";
export const EditDescriptionPopupComponent = ({
  photoDescription,
  setIsEditDescription,
  image
}) => {
  const [description, setDescription] = useState(photoDescription);
  const dispatch = useDispatch();
  const handleEditDescriptionSubmit = (event) => {
    event.preventDefault();
    dispatch(updateFavDescription({ id: image.id, description:description.trim() }));
    alert("Description Updated");
    setIsEditDescription(false);
  };
  return (
    <div className="edit-popup" onMouseDown={() => setIsEditDescription(false)}>
      <article className="edit-popup__content" onMouseDown={(event) => event.stopPropagation()}>
        <button className="edit-popup__close-button" onClick={() => setIsEditDescription(false)}>x</button>
        <form className="edit-popup__form" onSubmit={handleEditDescriptionSubmit}>
          <label htmlFor="description" className="edit-popup__form__label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="edit-popup__form__textarea"
            maxLength={300}
          ></textarea>
          <button className="edit-popup__form__submit-button" type="submit">Update Description</button>
        </form>
      </article>
    </div>
  );
};