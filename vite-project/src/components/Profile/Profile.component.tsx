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
import {useGetCollaboratorQuery, useGetRolesQuery, useUpdateCollaboratorMutation} from "../../services/collaborator.ts";
import {useParams} from "react-router";
import {Divider, Stack} from "@mui/material";
import {FormEvent} from "react";
import {setCredentials} from "../../features/authSlice.ts";
import {LoadingComponent} from "../Loading";

export const ProfileComponent = () => {
    const {id} = useParams();
    const user = useSelector((state: RootState) => state.auth.user);
    const userId = id || user?.id || ""
    const dispatch = useDispatch();
    const {data: collaborator, isLoading} = useGetCollaboratorQuery(userId, {refetchOnMountOrArgChange: true})
    const permission = useSelector((state: RootState) => state.auth.permission);
    const {data: roles} = useGetRolesQuery()
    const [updateCollaborator] = useUpdateCollaboratorMutation()

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
            dispatch(setCredentials({user: updatedCollaborator, token: localStorage.getItem("token")}));
        }
    }

    const handleRole = (e: { target: { value: string; }; }) => {
        const payload = {
            id: userId,
            role_id: e.target.value
        }
        updateCollaborator(payload)
    }

    const hasEditPermissions = () => {
        if (userId === user?.id) return true;
        return !!(permission && permission["update-users"]);
    }

    const hasRolePermissions = () => {
        return !!(permission && permission["update-roles"]);
    }

    if (isLoading) return <LoadingComponent/>;

    return (
        <Stack>
            <ProfileBox>
                <ProfileForm onSubmit={e => handleUpdate(e)}>
                    <ProfileTitle>Personal Info</ProfileTitle>
                    <input type={"hidden"} name={"id"} value={collaborator?.id}/>
                    <ProfileInput placeholder={"Email"} disabled={!hasEditPermissions()} name={"email"}
                                  defaultValue={collaborator?.email}/>
                    <ProfileInput placeholder={"Name"} disabled={!hasEditPermissions()} name={"name"}
                                  defaultValue={collaborator?.name}/>
                    {
                        hasEditPermissions() && (
                            <>
                                <ProfileInput placeholder={"Password"} name={"password"}/>
                                <ProfileInput placeholder={"Confirm Password"} name={"password_confirmation"}/>
                                <Stack flex={1} width={"100%"} alignItems={"start"}>
                                    <ProfileButton>Update</ProfileButton>
                                </Stack>
                            </>
                        )
                    }
                </ProfileForm>
                <ProfileInfo>
                    <ProfileTitle>Activity Info</ProfileTitle>
                    <ProfileText><InfoLabel>Teams leadered:</InfoLabel> {collaborator?.leads.length}</ProfileText>
                    <Divider sx={{width: "100%"}}/>
                    <ProfileText><InfoLabel>Projects owned:</InfoLabel> {collaborator?.owns.length}</ProfileText>
                    <Divider sx={{width: "100%"}}/>
                    <ProfileText><InfoLabel>Teams:</InfoLabel> {collaborator?.teams.length}</ProfileText>
                    <Divider sx={{width: "100%"}}/>
                    {
                        hasRolePermissions() && userId !== user?.id && (
                            <>
                                <ProfileText>
                                    <InfoLabel>Role: </InfoLabel>
                                    <select onChange={handleRole}>
                                        {
                                            roles?.map(role =>
                                                <option selected={role.id === collaborator?.role_id}
                                                        value={role.id}>{role.name}</option>)
                                        }
                                    </select>
                                </ProfileText>
                                <Divider sx={{width: "100%"}}/>
                            </>
                        )
                    }
                </ProfileInfo>
            </ProfileBox>
        </Stack>
    );
};
