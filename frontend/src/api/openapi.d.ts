import type {
    OpenAPIClient,
    Parameters,
    UnknownParamsObject,
    OperationResponse,
    AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        /**
         * Assignment
         */
        export interface Assignment {
            /**
             * Assignment Id
             */
            assignment_id: string; // uuid4
            /**
             * Group Id
             */
            group_id: string; // uuid4
            /**
             * Issuer
             */
            issuer: string;
            /**
             * Title
             */
            title: string;
            /**
             * Description
             * Short preview of the description, plain text
             */
            description: string;
            /**
             * Full Description
             * Base64 encoded description
             */
            full_description: string;
            /**
             * Assigned At
             */
            assigned_at: string; // date-time
            /**
             * Due To
             */
            due_to: string; // date-time
            /**
             * Mandatory
             */
            mandatory: boolean;
        }
        /**
         * AssignmentsListResponse
         */
        export interface AssignmentsListResponse {
            meta: /* PaginationMeta */ PaginationMeta;
            /**
             * Content
             */
            content: /* Assignment */ Assignment[];
        }
        /**
         * CreateAssignment
         */
        export interface CreateAssignment {
            /**
             * Issuer
             */
            issuer: string;
            /**
             * Title
             */
            title: string;
            /**
             * Description
             */
            description: string;
            /**
             * Full Description
             */
            full_description: string;
            /**
             * Assigned At
             */
            assigned_at?: string; // date-time
            /**
             * Due To
             */
            due_to: string; // date-time
            /**
             * Mandatory
             */
            mandatory: boolean;
        }
        /**
         * CreateGroup
         */
        export interface CreateGroup {
            /**
             * Name
             */
            name: string;
            /**
             * Editor Code
             */
            editor_code: string;
            /**
             * Student Code
             */
            student_code: string;
        }
        /**
         * Group
         */
        export interface Group {
            /**
             * Group Id
             */
            group_id: string; // uuid4
            /**
             * Name
             */
            name: string;
            /**
             * Editor Code
             */
            editor_code: string;
            /**
             * Student Code
             */
            student_code: string;
            /**
             * Created At
             */
            created_at: string; // date-time
        }
        /**
         * HTTPValidationError
         */
        export interface HTTPValidationError {
            /**
             * Detail
             */
            detail?: /* ValidationError */ ValidationError[];
        }
        /**
         * PaginationMeta
         */
        export interface PaginationMeta {
            /**
             * Total
             */
            total: number;
            /**
             * Limit
             */
            limit: number;
            /**
             * Offset
             */
            offset: number;
        }
        /**
         * ValidationError
         */
        export interface ValidationError {
            /**
             * Location
             */
            loc: (string | number)[];
            /**
             * Message
             */
            msg: string;
            /**
             * Error Type
             */
            type: string;
        }
    }
}
declare namespace Paths {
    namespace CreateAssignmentAssignmentsPost {
        export interface HeaderParameters {
            "X-Editor-Code": /* X-Editor-Code */ Parameters.XEditorCode;
        }
        namespace Parameters {
            /**
             * X-Editor-Code
             */
            export type XEditorCode = string;
        }
        export type RequestBody = /* CreateAssignment */ Components.Schemas.CreateAssignment;
        namespace Responses {
            export type $200 = /* Assignment */ Components.Schemas.Assignment;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace CreateGroupGroupsPost {
        export type RequestBody = /* CreateGroup */ Components.Schemas.CreateGroup;
        namespace Responses {
            export type $200 = /* Group */ Components.Schemas.Group;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GetAssignmentAssignmentsAssignmentIdGet {
        export interface HeaderParameters {
            "X-Student-Code": /* X-Student-Code */ Parameters.XStudentCode;
        }
        namespace Parameters {
            /**
             * Assignment Id
             */
            export type AssignmentId = string; // uuid4
            /**
             * X-Student-Code
             */
            export type XStudentCode = string;
        }
        export interface PathParameters {
            assignment_id: /* Assignment Id */ Parameters.AssignmentId /* uuid4 */;
        }
        namespace Responses {
            export type $200 = /* Assignment */ Components.Schemas.Assignment;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GetAssignmentsAssignmentsGet {
        export interface HeaderParameters {
            "X-Student-Code": /* X-Student-Code */ Parameters.XStudentCode;
        }
        namespace Parameters {
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
            /**
             * Order By
             */
            export type OrderBy = "created_at" | "assigned_at" | "due_to";
            /**
             * Order Direction
             */
            export type OrderDirection = "asc" | "desc";
            /**
             * X-Student-Code
             */
            export type XStudentCode = string;
        }
        export interface QueryParameters {
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
            order_by?: /* Order By */ Parameters.OrderBy;
            order_direction?: /* Order Direction */ Parameters.OrderDirection;
        }
        namespace Responses {
            export type $200 = /* AssignmentsListResponse */ Components.Schemas.AssignmentsListResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GetGroupGroupsGet {
        export interface HeaderParameters {
            "X-Student-Code": /* X-Student-Code */ Parameters.XStudentCode;
        }
        namespace Parameters {
            /**
             * X-Student-Code
             */
            export type XStudentCode = string;
        }
        namespace Responses {
            export type $200 = /* Group */ Components.Schemas.Group;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UpdateGroupGroupsPut {
        export interface HeaderParameters {
            "X-Editor-Code": /* X-Editor-Code */ Parameters.XEditorCode;
        }
        namespace Parameters {
            /**
             * X-Editor-Code
             */
            export type XEditorCode = string;
        }
        export type RequestBody = /* CreateGroup */ Components.Schemas.CreateGroup;
        namespace Responses {
            export type $200 = /* Group */ Components.Schemas.Group;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
}

export interface OperationMethods {
    /**
     * get_assignments_assignments__get - Get Assignments
     */
    'get_assignments_assignments__get'(
        parameters?: Parameters<Paths.GetAssignmentsAssignmentsGet.QueryParameters & Paths.GetAssignmentsAssignmentsGet.HeaderParameters> | null,
        data?: any,
        config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetAssignmentsAssignmentsGet.Responses.$200>
    /**
     * create_assignment_assignments__post - Create Assignment
     */
    'create_assignment_assignments__post'(
        parameters?: Parameters<Paths.CreateAssignmentAssignmentsPost.HeaderParameters> | null,
        data?: Paths.CreateAssignmentAssignmentsPost.RequestBody,
        config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateAssignmentAssignmentsPost.Responses.$200>
    /**
     * get_assignment_assignments__assignment_id__get - Get Assignment
     */
    'get_assignment_assignments__assignment_id__get'(
        parameters?: Parameters<Paths.GetAssignmentAssignmentsAssignmentIdGet.HeaderParameters & Paths.GetAssignmentAssignmentsAssignmentIdGet.PathParameters> | null,
        data?: any,
        config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetAssignmentAssignmentsAssignmentIdGet.Responses.$200>
    /**
     * get_group_groups__get - Get Group
     */
    'get_group_groups__get'(
        parameters?: Parameters<Paths.GetGroupGroupsGet.HeaderParameters> | null,
        data?: any,
        config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetGroupGroupsGet.Responses.$200>
    /**
     * update_group_groups__put - Update Group
     */
    'update_group_groups__put'(
        parameters?: Parameters<Paths.UpdateGroupGroupsPut.HeaderParameters> | null,
        data?: Paths.UpdateGroupGroupsPut.RequestBody,
        config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateGroupGroupsPut.Responses.$200>
    /**
     * create_group_groups__post - Create Group
     */
    'create_group_groups__post'(
        parameters?: Parameters<UnknownParamsObject> | null,
        data?: Paths.CreateGroupGroupsPost.RequestBody,
        config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateGroupGroupsPost.Responses.$200>
}

export interface PathsDictionary {
    ['/assignments/']: {
        /**
         * get_assignments_assignments__get - Get Assignments
         */
        'get'(
            parameters?: Parameters<Paths.GetAssignmentsAssignmentsGet.QueryParameters & Paths.GetAssignmentsAssignmentsGet.HeaderParameters> | null,
            data?: any,
            config?: AxiosRequestConfig
        ): OperationResponse<Paths.GetAssignmentsAssignmentsGet.Responses.$200>
        /**
         * create_assignment_assignments__post - Create Assignment
         */
        'post'(
            parameters?: Parameters<Paths.CreateAssignmentAssignmentsPost.HeaderParameters> | null,
            data?: Paths.CreateAssignmentAssignmentsPost.RequestBody,
            config?: AxiosRequestConfig
        ): OperationResponse<Paths.CreateAssignmentAssignmentsPost.Responses.$200>
    }
    ['/assignments/{assignment_id}']: {
        /**
         * get_assignment_assignments__assignment_id__get - Get Assignment
         */
        'get'(
            parameters?: Parameters<Paths.GetAssignmentAssignmentsAssignmentIdGet.HeaderParameters & Paths.GetAssignmentAssignmentsAssignmentIdGet.PathParameters> | null,
            data?: any,
            config?: AxiosRequestConfig
        ): OperationResponse<Paths.GetAssignmentAssignmentsAssignmentIdGet.Responses.$200>
    }
    ['/groups/']: {
        /**
         * get_group_groups__get - Get Group
         */
        'get'(
            parameters?: Parameters<Paths.GetGroupGroupsGet.HeaderParameters> | null,
            data?: any,
            config?: AxiosRequestConfig
        ): OperationResponse<Paths.GetGroupGroupsGet.Responses.$200>
        /**
         * create_group_groups__post - Create Group
         */
        'post'(
            parameters?: Parameters<UnknownParamsObject> | null,
            data?: Paths.CreateGroupGroupsPost.RequestBody,
            config?: AxiosRequestConfig
        ): OperationResponse<Paths.CreateGroupGroupsPost.Responses.$200>
        /**
         * update_group_groups__put - Update Group
         */
        'put'(
            parameters?: Parameters<Paths.UpdateGroupGroupsPut.HeaderParameters> | null,
            data?: Paths.UpdateGroupGroupsPut.RequestBody,
            config?: AxiosRequestConfig
        ): OperationResponse<Paths.UpdateGroupGroupsPut.Responses.$200>
    }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type Assignment = Components.Schemas.Assignment;
export type AssignmentsListResponse = Components.Schemas.AssignmentsListResponse;
export type CreateAssignment = Components.Schemas.CreateAssignment;
export type CreateGroup = Components.Schemas.CreateGroup;
export type Group = Components.Schemas.Group;
export type HTTPValidationError = Components.Schemas.HTTPValidationError;
export type PaginationMeta = Components.Schemas.PaginationMeta;
export type ValidationError = Components.Schemas.ValidationError;
