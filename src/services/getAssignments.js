export async function getAssignments(studentId, courseId) {
    try {
        const url = import.meta.env.REACT_BASE_URL + import.meta.env.REACT_ASSIGNMENTS + "studentId" + studentId + "&courseId=" + courseId;

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