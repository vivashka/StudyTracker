export async function authentication(user) {
    try {
        const url = import.meta.env.REACT_BASE_URL + import.meta.env.REACT_AUTHENTICATION;

        const response = await fetch(url, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(user)
        })

        return await response.json()
    } catch (err) {
        return {
            success: false, message: err.message, code: "500"
        }
    }

}