import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../Preloader/Preloader';
import userPhoto from '../../../Assets/Images/userPhoto.png';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import ProfileDataReduxForm from './ProfileData/ProfileDataForm';
import ProfileData from './ProfileData/ProfileData';


const ProfileInfo = ({saveProfile, isOwner, savePhoto, profile, status, updateUserStatus}) => {
    let [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        saveProfile(formData)
        .then (() => {
            setEditMode(false)
        })
    }
    return <div className={s.myInfo}>
        <div className={s.left}>
            <img className={s.mainPhoto} src={profile.photos.large != null ? profile.photos.large : userPhoto}/>
            {isOwner && <input className={s.selectFile} type={'file'} onChange={onMainPhotoSelected}/>}
            {/*<MyFriends/>*/}
        </div>
        <div className={s.right}>
            <div className={s.name}>
                {profile.fullName}
            </div>
            <div className={s.status}>
                <ProfileStatusWithHooks updateUserStatus={updateUserStatus} status={status}/>
            </div>
            <div> {editMode ? <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/> :
                <ProfileData goToEditMode={() => {setEditMode(true)}}
                             profile={profile}
                             isOwner={isOwner}/>}</div>
        </div>
    </div>
}

export default ProfileInfo;