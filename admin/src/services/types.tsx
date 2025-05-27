export interface Category {
  data: any;
  id: string;
  name: string;
  photos: Photo[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Banner {
  id: number;
  title: string;
  type: string;
  image: string[];
  link: string;
  position: number;
  status: string;
  created_by?: number;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface BannerApiResponse {
  status: string;
  code: number;
  message: string;
  data: Banner;
}

export interface AdditionalSalary {
  id: number;
  user_id: string;
  additional_salary: string;
  reason: string;
  date: string;
  status: string;
}

export interface AdditionalSalaryFormProps {
  data: AdditionalSalary | null;
  selectUser: string;
  setSelectUser: (value: string) => void;
}

export interface AdditionalSalaryApiResponse {
  status: string;
  code: number;
  message: string;
  data: AdditionalSalary;
}

export interface Leave {
  id: number;
  reason: string;
  from_date: string;
  to_date: string;
}

export interface LeaveApiResponse {
  status: string;
  code: number;
  message: string;
  data: Leave;
}

export interface Popular {
  id: number;
  title: string;
  image: string[];
  link: string;
  position: number;
  status: string;
  created_by?: number;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface PopularApiResponse {
  status: string;
  code: number;
  message: string;
  data: Popular;
}

export interface Account {
  id: number;
  balance: string;
  code: string;
  name: string;
  normal_balance: string;
  opening_balance: string;
  type: string;
  created_by: number;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface AccountApiResponse {
  status: string;
  code: number;
  message: string;
  data: Account;
}

export interface Unit {
  id: number;
  name: string;
  label: string;
  status: string;
  multiplier: string;
  created_at: string;
  updated_at: string;
}

export interface UnitApiResponse {
  status: string;
  code: number;
  message: string;
  data: Unit;
}

export interface Holiday {
  id: number;
  name: string;
  status: string;
  from_date: string;
  to_date: string;
  created_by: number;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface HolidayApiResponse {
  status: string;
  code: number;
  message: string;
  data: Holiday;
}

export interface Location {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Camera {
  id: string;
  name: string;
  status: string;
  stream_path: string;
}

export interface CameraApiResponse {
  status: string;
  code: number;
  message: string;
  data: Camera;
}

export interface LocationApiResponse {
  status: string;
  code: number;
  message: string;
  data: Location;
}

export interface ExpenseHead {
  id: string;
  name: string;
  unit: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseApiResponse {
  status: string;
  code: number;
  message: string;
  data: ExpenseHead;
}

export interface Department {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentApiResponse {
  status: string;
  code: number;
  message: string;
  data: Department;
}

export interface Designation {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DesignationApiResponse {
  status: string;
  code: number;
  message: string;
  data: Designation;
}

export interface Brand {
  id: string;
  title: string;
  position: string;
  photo: Photo[];
  image: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandApiResponse {
  status: string;
  code: number;
  message: string;
  data: Brand;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  userName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Faq {
  id: string;
  answer: string;
  question: string;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FaqApiResponse {
  status: string;
  code: number;
  message: string;
  data: Faq;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  father_or_husband_name: string;
  address: string;
  nid_number: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerApiResponse {
  status: string;
  code: number;
  message: string;
  data: Customer;
}

export interface LeedDetail {
  amount: number;
}

export interface Leed {
  customer_id: string;
  lead_date: string;
  customer_profession: string;
  customer_name: string;
  lead_status: string;
  lead_source: string;
  phone: string;
  project_id: string;
  designation: string;
  organization_name: string;
  email: string;
  user_id: string;
  schedule_type: string;
  status: string;
  date: string;
  summary: string;
  next_followup_date?: string;
  remarks?: string;
  details: LeedDetail[];
}

export interface LeedFormProps {
  lead: Leed | null;
  selectedCustomer: string;
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  setSelectedCustomer: (value: string) => void;
  selectedUser: string;
  setSelectedUser: (value: string) => void;
  leadStatus: string;
  setLeadStatus: (value: string) => void;
  scheduleType: string;
  setScheduleType: (value: string) => void;
  leadSource: string;
  setLeadSource: (value: string) => void;
  onDetailsChange: (details: LeedDetail[]) => void;
  details: LeedDetail[];
  setDetails: (details: LeedDetail[]) => void;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  image: string[];
  phone: string;
  password: string;
  address: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorApiResponse {
  status: string;
  code: number;
  message: string;
  data: Vendor;
}

export interface Dynamic {
  id: string;
  name: string;
  desc: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subcategory {
  id: string;
  name: string;
  category: Category;
  photos: Photo[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressTimeline {
  title: string;
  progress: number;
  status: boolean;
}

export interface Project {
  location_id: string;
  name: string;
  id?: string;
  address: string;
  project_type: string;
  facing: string;
  building_height: string;
  land_area: string;
  launching_date: string;
  hand_over_date: string;
  road_width: string;
  total_share: string;
  images: string[];
  unit_images: string[];
  floor_images: string[];
  documents: string[];
  unit_per_floor: string;
  status: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  progress_timeline: ProgressTimeline[];
  cc_camera_urls: string[];
}

export interface AdditionalData extends Partial<Project> {
  // Allow partial Project fields, but ensure documents is string[] for URLs
  documents?: string[];
  deleted_documents?: string[];
  content?: string;
  details?: string[];
}

export interface ProjectApiResponse {
  status: string;
  code: number;
  message: string;
  data: Project;
}

export interface Product {
  id: string;
  project_id: string;
  flat_type: string;
  floor_number: string;
  flat_size: string;
  unit_price: string;
  total_price: string;
  parking_charge: string;
  utility_charge: string;
  additional_charge: string;
  other_charge: string;
  discount: string;
  refund_amount: string;
  description: string;
  status: string;
  bedroom: string;
  bathroom: string;
  kitchen: string;
  drawing_room: string;
  dining_room: string;
  balcony: string;
  rooftop_gardening: boolean;
  car_parking: boolean;
  passenger_lift: string;
  generator: boolean;
  emi_mounts: string;
  emi_amount: string;
  booking_money: string;
  land_registration_amount: string;
  service_charge: string;
  images: string[];
  layout_images: string[];
}

export interface ProductApiResponse {
  status: string;
  code: number;
  message: string;
  data: Product;
}

export interface Variant {
  id: string;
  name: string;
  options: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  name: string;
  link: string;
  image: string[];
  designation: string;
  message: string;
  status: string;
}

export interface ReviewApiResponse {
  status: string;
  code: number;
  message: string;
  data: Review;
}

export interface BlogComment {
  id: string;
  userName: string;
  email: string;
  comment: string;
  blogId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  image: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  blogComments: BlogComment[];
}

export interface BlogApiResponse {
  status: string;
  code: number;
  message: string;
  data: Blog;
}

export interface Advance {
  files: File[];
  id: string;
  name: string;
  number: string;
  email: string;
  students: string;
  ratio: string;
  topPart: string;
  topFab: string;
  bottomPart: string;
  bottomFab: string;
  address: string;
  quantity: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  photos: Photo[];
  vendors: User[];
}

export interface CommonData {
  files?: any;
  id: string;
  name: string;
  photos: Photo[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  userId?: string;
  employee?: any;
  refferCode?: string;
  gender: Gender;
  password: string;
  address?: string;
  role: UserRole;
  status: UserStatus;
  branchId?: string;
  createdAt: Date;
  updatedAt: Date;
  photos: Photo[];
  advances?: Advance[];
  _user_type: string;
  permissions?: Permission[];
}

export interface Admin {
  numberOfProjects: number;
  totalSoldFlats: number;
  totalAvailableFlats: number;
  numberOfClients: number;
  numberOfProjectsInArea: number;
}

export interface Order {
  totalGrandPrice: Order | null;
  id: string;
  getState: OrderItem[];
  grandPrice?: string;
  selectedSize?: string;
  selectedColor?: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
  email?: string;
  phone?: string;
  city?: string;
  streetAddress?: string;
  country?: string;
  district?: string;
  apartment?: string;
  postCode?: string;
  address?: string;
  gender?: Gender;
  paymentType?: string;
  paymentNumber?: string;
  transactionId?: string;
  bkashNumber?: string;
  bkashTrx?: string;
  rocketNumber?: string;
  rocketTrx?: string;
  dutchNumber?: string;
  dutchTrx?: string;

  status: OrderStatus;
  totalAmount?: number;
  receivedTk?: number;
  dueAmount?: number;
  totalReceiveTk?: number;
  unReceivedTk?: number;
  paymentStatus?: string;
  bookingExtend?: boolean;
  isCancel: CancelStatus;
  userCancel?: unknown;
  riders: User[];
  createdAt: Date;
  updatedAt: Date;
  permissions: Permission[];
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  size: string;
  color: string;
}
export interface School {
  data: any;
  id: string;
  name: string;
  photos: Photo[];
  email?: string;
  password?: string;
  location?: string;
  status: SchoolStatus;
  students: Student[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Permission {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  mobile: string;
  total: string;
  category: string;
  height: number;
  shoulder: number;
  sleeveLength: number;
  collar: number;
  length: number;
  armhole: number;
  sleeveOpening: number;
  waist: number;
  waistSize: number;
  halfBody?: number;
  bottomHem?: number;
  hips?: number;
  schoolId: string;
  school: School;
  createdAt: Date;
  updatedAt: Date;
  students: Student[];
}

export interface RequisitionItem {
  unit_id: string;
  description: string;
  qty: number;
  unit_price: number;
}

export interface Requisition {
  id?: string;
  project_id: string;
  remark: string;
  description: string;
  required_date: string;
  items: RequisitionItem[];
}

export interface RequisitionApiResponse {
  status: string;
  code: number;
  message: string;
  data: Requisition;
}

export interface RequisitionFormProps {
  requisition: Requisition | null;
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  onRequisitionChange: (requisition: Requisition) => void;
}

export interface JournalItem {
  chart_of_account_id: string;
  entry_type: string;
  amount: number;
}

export interface Journal {
  id?: string;
  reference_number: string;
  transaction_date: string;
  description: string;
  details: JournalItem[];
}

export interface JournalApiResponse {
  status: string;
  code: number;
  message: string;
  data: Journal;
}

export interface JournalFormProps {
  journal: Journal | null;
  onJournalChange: (journal: Journal) => void;
}

export interface Discount {
  id: string;
  name: string;
  photos: Photo[];
  amount: string;
  min: string;
  startDate: string;
  endDate: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

export interface Employee {
  id: string;
  user_id: string;
  employee: any;
  department_id: string;
  designation_id: string;
  joining_date: string;
  bank_account_number: string;
  salary: string;
  status: string;
}

export interface EmployeeApiResponse {
  status: string;
  code: number;
  message: string;
  data: Employee;
}

export interface EmployeeFormProps {
  employee: Employee | null;
  selectedUser: string;
  setSelectedUser: (value: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
  selectedDesignation: string;
  setSelectedDesignation: (value: string) => void;
}

export interface Payment {
  id: string;
  entity_id: string;
  entity_type: any;
  amount: string;
  payment_method: string;
  payment_type: string;
  transaction_id: string;
  payment_note: string;
  payment_date: string;
  status: string;
  documents: string[];
}

export interface PaymentFormProps {
  payment: Payment | null;
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
}

export interface Notification {
  id: string;
  entity_id: string;
  entity_type: any;
  message: string;
  title: string;
}

export interface NotificationApiResponse {
  status: string;
  code: number;
  message: string;
  data: Notification;
}

export interface ImageFieldConfig {
  key: string;
  isMultiple: boolean;
  isArray: boolean; // New property to indicate array or single file
  label?: string;
}

export interface NotificationFormProps {
  payment: Notification | null;
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
}

export interface GrandPrice {
  data: {
    totalGrandPrice: number;
  };
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "approved"
  | "delivered"
  | "canceled";

export type CancelStatus = "YES" | "NO";

export type SchoolStatus = "active" | "pending" | "processing" | "delivery";

export type Gender = "Male" | "Female" | "Other";

export type UserRole =
  | "superAdmin"
  | "admin"
  | "user"
  | "manager"
  | "vendor"
  | "schoolManager"
  | "rider"
  | "b2bManager";

export type UserStatus = "active" | "deactive" | "blocked";

export interface BaseEditProps {
  params: {
    [key: string]: string;
  };
}

export interface Photo {
  title: string;
  src: string;
}

export interface ProductFormProps {
  product: Product | null;
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  onDescriptionChange: (description: string) => void;
}

export interface ProjectFormProps {
  project: Project | null;
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
  onProjectChange: (newProject: Project) => void;
}

export interface VariantFormProps {
  variant: Variant | null;
  variantOptions: string[];
  setVariantOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface UserFormProps {
  user: User | null;
}
export interface StudentFormProps {
  student: Student | null;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedSchool: string;
  setSelectedSchool: React.Dispatch<React.SetStateAction<string>>;
}
