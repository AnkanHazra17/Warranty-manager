import { MdOutlineCloudUpload } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { IconType } from "react-icons";
import { MdRunningWithErrors } from "react-icons/md";

interface NavLink {
    label: string;
    route: string;
    icon: IconType;
}

export interface CustomerDetails {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    name: string;
    email: string;
    phone: string;
    address: string;
    country: string;
}

export interface MockUsersInfo {
    name: string;
    email: string;
    mobile: string;
    total: number;
}

export interface MockIssuesInfo{
    email: string;
    deviceType: string;
    deviceId: string;
    status: string;
}

export interface RegisterFormSteps{
    id: number;
    label: string;
}

export interface UploadDeviceMethod{
    label: string;
    method: string;
}

export const sideNavLinks: NavLink[] = [
    {
        label: "Register",
        route: "/",
        icon: MdOutlineCloudUpload
    },
    {
        label: "Issues",
        route: "/issues",
        icon: MdRunningWithErrors
    },
    {
        label: "Customers",
        route: "/customers",
        icon: LuUsers
    },
]

export const uploadDeviceIdMethod: UploadDeviceMethod[] = [
    {
        label: "Manual",
        method: "manual",
    },
    {
        label: "By uploading excel sheet",
        method: "xlsx",
    }
]

export const registerFormNewUserSteps: RegisterFormSteps[] = [
    {
        id: 1,
        label: "Customer details",
    },
    {
        id: 2,
        label: "Device details",
    },
    {
        id: 3,
        label: "Delivery date",
    }
]

export const registerFormExistingUserSteps: RegisterFormSteps[] = [
    {
        id: 1,
        label: "Select customer",
    },
    {
        id: 2,
        label: "Device details",
    },
    {
        id: 3,
        label: "Delivery date",
    }
]

export const mockUsersInfo: MockUsersInfo[] = [
    {
        name: "Souvik",
        email: "souvik@gmail.com",
        mobile: "1234567890",
        total: 4,
    },
    {
        name: "Ankan",
        email: "ankan@gmail.com",
        mobile: "1234567890",
        total: 4,
    },
    {
        name: "Ankush",
        email: "ankush@gmail.com",
        mobile: "1234567890",
        total: 4,
    },
    {
        name: "Sheet",
        email: "sheet@gmail.com",
        mobile: "1234567890",
        total: 4,
    },
    {
        name: "Xyz",
        email: "xyz@gmail.com",
        mobile: "1234567890",
        total: 4,
    },
    {
        name: "Landseed",
        email: "landseed@gmail.com",
        mobile: "1234567890",
        total: 4,
    },
    {
        name: "Abc",
        email: "abc@gmail.com",
        mobile: "1234567890",
        total: 4,
    },
]

export const mockIssuesData: MockIssuesInfo[] = [
    {
        email: "john.doe@example.com",
        deviceType: "Whizpad",
        deviceId: "WP123456789",
        status: "Resolved"
    },
    {
        email: "jane.smith@example.com",
        deviceType: "Whizconnect",
        deviceId: "WC987654321",
        status: "Pending"
    },
    {
        email: "alice.williams@example.com",
        deviceType: "Whizpad",
        deviceId: "WP456789012",
        status: "In Progress"
    },
    {
        email: "bob.johnson@example.com",
        deviceType: "Whizconnect",
        deviceId: "WC789123456",
        status: "Resolved"
    },
    {
        email: "charlie.brown@example.com",
        deviceType: "Whizpad",
        deviceId: "WP321654987",
        status: "Pending"
    }
];

