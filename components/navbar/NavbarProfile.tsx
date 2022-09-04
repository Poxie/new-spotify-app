import Button from "../button"

export const NavbarProfile = () => {
    const logout = () => {
        // Removing tokens from storage
        window.localStorage.accessToken = '';
        window.localStorage.refreshToken = '';

        // If user is in profile, navigate away to prevent refetch of tokens
        if(window.location.href.includes('profile')) return window.location.href = '/';

        // Else reload site
        window.location.reload();
    }

    return(
        <Button onClick={logout}>
            Log out
        </Button>
    )
}