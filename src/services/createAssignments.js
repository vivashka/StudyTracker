export async function createAssignment(assignment) {
    try {
        const url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_ASSIGNMENTS_CREATE;

        const response = await fetch(url, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(assignment)
        })

        return await response.json()
    } catch (err) {
        return {
            isSuccess: false, errorMessage: err.message, errorCode: "500"
        }
    }
}