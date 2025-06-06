export async function createCourse(course) {
    try {
        const url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_COURSES;

        const response = await fetch(url, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(course)
        })

        return await response.json()
    } catch (err) {
        return {
            isSuccess: false, errorMessage: err.message, errorCode: "500"
        }
    }
}