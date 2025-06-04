export async function updateAssignmentState(assignmentId, studentId, state) {
    try {
        const url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_ASSIGNMENTS_STATE +
            "assignmentId" + assignmentId +
            "&studentId=" + studentId +
            "&state=" + state;

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