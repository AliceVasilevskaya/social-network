import React, {useEffect, useState} from 'react';

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status)
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    return <div>
        {!editMode &&
        <div onDoubleClick={activateEditMode}>
            <span>{props.status || '---'}</span>
        </div>
        }
        {editMode &&
        <div>
            <input onChange={onStatusChange} autoFocus={true}
                   onBlur={deactivateEditMode} value={status}/>
        </div>
        }
    </div>
}

export default ProfileStatus;