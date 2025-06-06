export async function getCourses(studentId) {
    try {
        const url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_COURSES + studentId;

        const response = await fetch(url, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
            }
        })

        return await response.json()
    } catch (err) {
        return {
            isSuccess: false, errorMessage: err.message, errorCode: "500"
        }
    }
}