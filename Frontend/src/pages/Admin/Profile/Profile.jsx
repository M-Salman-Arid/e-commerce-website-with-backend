import "./Profile.css";
import { useEffect, useState } from "react";
import { getProfileAPI, updateProfileAPI, changePasswordAPI} from "../../../api/userAPI";

const Profile = () => {

    const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    const [image, setImage] = useState(null);

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: ""

    });

    const [preview, setPreview] = useState(defaultProfileImage);

    const fetchProfile = async () => {

        try {

            const data = await getProfileAPI();

            setProfile({
                name: data.user.name,
                email: data.user.email,
                phone: data.user.phone || ""

            });

            if (data.user.profile_image) {
                setPreview(
                    `data:image/jpeg;base64,${data.user.profile_image}`
                );
            } else {
                setPreview(defaultProfileImage);
            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        const loadProfile = async () => {
            await fetchProfile();
        };

        loadProfile();

    }, []);



    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setPreview(URL.createObjectURL(file));
        setImage(file);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("name", profile.name);
            formData.append("phone", profile.phone);

            if (image) {
                formData.append("profileImage", image);
            }

            console.log("Form Data:", formData);

            const response = await updateProfileAPI(formData);

            if (response.success) {
                alert("Profile updated successfully!");
                await fetchProfile();
                setImage(null);
            } else {
                alert("Failed to update profile.");
            }

        } catch (error) {

            console.log(error);

            alert("An error occurred while updating the profile.");

        }

    };

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordSubmit = async (e) => {

        e.preventDefault();

        if(passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New password and confirm Password do not match.")
            return
        }

        try {

            const response = await changePasswordAPI(passwordData);

            alert(response.message);

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update password."
            );

        }

    };


    return (
        <div className="profile-page">

            <div className="page-heading">
                <h1>My Profile</h1>
                <p>Manage your account information.</p>
            </div>

            <div className="profile-card">

                <div className="profile-image">

                    <img
                        src={preview}
                        alt="Profile"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                    />

                </div>

                <form
                    className="profile-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>Full Name</label>

                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            readOnly
                        />

                    </div>

                    <div className="form-group">

                        <label>Phone Number</label>

                        <input
                            type="text"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        className="save-btn"
                        type="submit"
                    >
                        Save Changes
                    </button>

                </form>

            </div>

            <div className="password-card">

                <h2>Change Password</h2>

                <form
                    className="password-form"
                    onSubmit={handlePasswordSubmit}
                >

                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                    />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                    />

                    <button
                        type="submit"
                        className="password-btn"
                    >
                        Update Password
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Profile;