export async function assignCourse(courseId, studentId) {
    try {
        const url = import.meta.env.VITE_BASE_URL + import.meta.env.REACT_COURSES_ASSIGN + "courseId=" + courseId + "&studentId=" + studentId;

        const response = await fetch(url, {
            method: 'PUT', headers: {
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