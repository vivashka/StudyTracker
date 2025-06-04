export async function authentication(user) {
    try {
        const url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_USER_AUTHENTICATION;

        const response = await fetch(url, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(user)
        })

        return await response.json()
    } catch (err) {
        return {
            isSuccess: false, errorMessage: err.message, errorCode: "500"
        }
    }
}