import {
    ProfileBox,
    ProfileButton,
    ProfileForm,
    ProfileInput,
    ProfileInfo,
    InfoLabel,
    ProfileTitle, ProfileText
} from "./Profile.styles.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {useGetCollaboratorQuery, useUpdateCollaboratorMutation} from "../../services/collaborator.ts";
import {useParams} from "react-router";
import {Divider, Stack} from "@mui/material";
import {FormEvent} from "react";
import {setCredentials} from "../../features/authSlice.ts";

export const ProfileComponent = () => {
    const {id} = useParams();
    const user = useSelector((state: RootState) => state.auth.user);
    const userId = id || user?.id || ""
    const dispatch = useDispatch();
    const {data: collaborator,} = useGetCollaboratorQuery(userId, {refetchOnMountOrArgChange: true})
    const [updateCollaborator] = useUpdateCollaboratorMutation()

    console.log("Usuário logado:", user);

    const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = Object.fromEntries(
            new FormData(
                e.currentTarget
            )
        )

        updateCollaborator(data)

        if (user?.id === userId) {
            const updatedCollaborator = {
                ...user,
                name: data.name,
                email: data.email
            }
            dispatch(setCredentials({ user: updatedCollaborator, token: localStorage.getItem("token") }));
        }
    }

    return (
        <ProfileBox>
            <ProfileForm onSubmit={e => handleUpdate(e)}>
                <ProfileTitle>Personal Info</ProfileTitle>
                <input type={"hidden"} name={"id"} value={collaborator?.id} />
                <ProfileInput placeholder={"Email"} name={"email"} defaultValue={collaborator?.email}/>
                <ProfileInput placeholder={"Name"} name={"name"} defaultValue={collaborator?.name}/>
                <ProfileInput placeholder={"Password"} name={"password"}/>
                <ProfileInput placeholder={"Confirm Password"} name={"password_confirmation"}/>
                <Stack flex={1} width={"100%"} alignItems={"start"}>
                    <ProfileButton>Update</ProfileButton>
                </Stack>
            </ProfileForm>
            <ProfileInfo>
                <ProfileTitle>Activity Info</ProfileTitle>
                <ProfileText><InfoLabel>Teams leadered:</InfoLabel> {collaborator?.leads.length}</ProfileText>
                <Divider sx={{width: "100%"}}/>
                <ProfileText><InfoLabel>Projects owned:</InfoLabel> {collaborator?.owns.length}</ProfileText>
                <Divider sx={{width: "100%"}}/>
                <ProfileText><InfoLabel>Teams:</InfoLabel> {collaborator?.teams.length}</ProfileText>
                <Divider sx={{width: "100%"}}/>
            </ProfileInfo>
        </ProfileBox>
    );
};
