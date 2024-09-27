import OpenAPIClientAxios from "openapi-client-axios";
import type { Client, Paths, Components } from "./openapi";
import { useAuthenticationStore } from "@/stores/authentication";

const openAPIAxios = new OpenAPIClientAxios({
    definition: `${import.meta.env.VITE_API_URL}/openapi.json`, withServer: Number.parseInt(import.meta.env.VITE_SERVER_ID),
});

let client: Client | null = null;
openAPIAxios.init<Client>().then((c) => { client = c; });

export { openAPIAxios };


export async function getAssignments(
    limit: number = 10,
    offset: number = 0,
    order_by: Paths.GetAssignmentsAssignmentsGet.Parameters.OrderBy | string = "created_at",
    orderDirection: Paths.GetAssignmentsAssignmentsGet.Parameters.OrderDirection | string = "desc",
): Promise<Components.Schemas.AssignmentsListResponse> {
    if (client === null) {
        throw Error("Client is not initialized");
    }

    const result = await client.get_assignments_assignments__get(
        {
            "X-Student-Code": useAuthenticationStore().getCode(),
            "limit": limit,
            "offset": offset,
            "order_by": order_by as Paths.GetAssignmentsAssignmentsGet.Parameters.OrderBy,
            "order_direction": orderDirection as Paths.GetAssignmentsAssignmentsGet.Parameters.OrderDirection,
        },
    ).catch(
        (error) => {
            throw Error(error);
        }
    )
    return result.data;
}


export async function getAssignment(assignmentId: string) {
    if (client === null) {
        throw Error("Client is not initialized");
    }

    const result = await client.get_assignment_assignments__assignment_id__get(
        {
            "X-Student-Code": useAuthenticationStore().getCode(),
            "assignment_id": assignmentId,
        },
    ).catch(
        (error) => {
            throw Error(error);
        }
    )
    return result.data;
}

export async function createAssignment(editorCode: string, assignment: Components.Schemas.CreateAssignment) {
    if (client === null) {
        throw Error("Client is not initialized");
    }

    const result = await client.create_assignment_assignments__post(
        {
            "X-Editor-Code": editorCode,
        },
        assignment,
    ).catch(
        (error) => {
            throw Error(error);
        }
    )
    return result.data;
}