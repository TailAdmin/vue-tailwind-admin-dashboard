// types/offers.types.ts

/**
 * نوع العرض
 */
export enum BillType {
  Offer = 0,  // عرض
  Order = 1   // طلب
}

/**
 * نوع الإيجار
 */
export enum RentalType {
  Shared = 0, // مشترك
  Full = 1    // كامل
}

/**
 * فئة المستخدم
 */
export enum UserCategory {
  Individual = 0,        // الأفراد
  Agency = 1,            // المنشآت والوسطاء
  PartnerSeeker = 2,     // الباحث عن شريك
  CommercialOrAdmin = 3  // إداري/تجاري
}

/**
 * نوع التسعير
 */
export enum PricingType {
  Monthly = 0,           // شهري
  Yearly = 1,            // سنوي
  PerUpload = 2,         // تحميل عدد محدد
  OnSuccess = 3,         // بعد النجاح
  CommissionOnly = 4,    // نسبة بعد التوقيع
  FixedContractFee = 5   // قيمة العقد الاختيارية
}

/**
 * نوع العرض
 */
export interface OfferType {
  id: string;
  name: string;
}

/**
 * نوع الوحدة
 */
export interface UnitType {
  id: string;
  name: string;
}

/**
 * الوحدة الزمنية
 */
export interface TimeUnit {
  id: string;
  name: string;
}

/**
 * الدور
 */
export interface Floor {
  id: string;
  name: string;
}

/**
 * نوع العقار
 */
export interface PropertyType {
  id: string;
  name: string;
}

/**
 * ميزة العرض
 */
export interface OfferFeature {
  id: string;
  name: string;
}

/**
 * المستخدم الحالي
 */
export interface CurrentUser {
  userId: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  dateOfBirth?: string;
  profilePicturePath?: string;
  notificationPreferences?: string;
  firebaseToken?: string;
  createdAt?: string;
}

/**
 * العرض - متطابق مع البيانات القادمة من Backend
 */
export interface Offer {
  id: string;
  title: string;
  description: string;
  price: number;
  isActive: boolean;
  duration: number;
  billType: BillType;
  
  // الأسماء المباشرة من Backend (بدلاً من IDs)
  offerTypeName: string;
  unitTypeName: string;
  floorName: string;
  propertyTypeName: string;
  rentalTypeName: string;
  timeUnitName: string;
  
  // الخصائص الإضافية
  area?: number;
  roomCount?: number;
  bathroomCount?: number;
  isPhoneAllowed: boolean;
  isWhatsappAllowed: boolean;
  isMessagingAllowed: boolean;
  locationDescription?: string;
  latitude?: number;
  longitude?: number;
  
  // IDs للعلاقات
  neighborhoodId: string;
  cityId: string;
  countryId: string;
  
  // الصور والفيديوهات (URLs مباشرة)
  imageUrls: string[];
  videoUrls: string[];
  
  // المميزات (أسماء مباشرة)
  features: string[];
  
  // المستخدم الحالي (صاحب العرض)
  currentUser: CurrentUser | null;
  
  // حالة المفضلة
  isFavorite: boolean;
  
  // معلومات إضافية
  createdAt?: string;
  updatedAt?: string;
}

/**
 * إحصائيات العروض
 */
export interface OfferStatistics {
  totalOffers: number;
  activeOffers: number;
  inactiveOffers: number;
  offersByType: Array<{
    offerTypeId: string;
    count: number;
  }>;
  offersByBillType: Array<{
    billType: string;
    count: number;
  }>;
  averagePrice: number;
  totalValue: number;
}

/**
 * نتيجة مقسمة للصفحات
 */
export interface PagedResult<T> {
  offers?: T[]; // اسم الحقل في الاستجابة
  data?: T[];   // اسم بديل
  totalCount: number;
  pageCount: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
}

/**
 * استجابة قائمة العروض من Backend
 */
export interface OffersResponse {
  offers: Offer[];
  totalCount: number;
  pageCount: number;
}

/**
 * معاملات البحث عن العروض
 */
export interface SearchOffersParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  isActive?: boolean;
  ownerId?: string;
  offerTypeId?: string;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * طلب إنشاء نوع عرض
 */
export interface CreateOfferTypeRequest {
  name: string;
}

/**
 * طلب تحديث نوع عرض
 */
export interface UpdateOfferTypeRequest {
  name: string;
}

// types/offers.types.ts - إضافة في نهاية الملف

/**
 * طلب إنشاء عرض جديد
 */
export interface CreateOfferCommand {
  title: string;
  description: string;
  price: number;
  isActive?: boolean;
  duration: number;
  floorId: string;              // الاسم وليس المعرف
  propertyTypeId: string;        // الاسم وليس المعرف
  timeUnitId: string;            // الاسم وليس المعرف
  offerTypeId: string;           // الاسم وليس المعرف
  unitTypeId: string;            // الاسم وليس المعرف
  billType: BillType;
  rentalType: RentalType;
  featureIds: string[];          // الأسماء وليس المعرفات
  images?: File[];
  videos?: File[];
  neighborhoodId?: string;       // يمكن استخدام القيمة الافتراضية
  cityId?: string;               // يمكن استخدام القيمة الافتراضية
  countryId?: string;            // يمكن استخدام القيمة الافتراضية
  area?: number;
  roomCount?: number;
  bathroomCount?: number;
  isPhoneAllowed: boolean;
  isWhatsappAllowed: boolean;
  isMessagingAllowed: boolean;
  locationDescription?: string;
  latitude?: number;
  longitude?: number;
  ownerId: string;
}

/**
 * نموذج البحث عن المستخدمين
 */
export interface UserSearchResult {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  profilePicturePath?: string;
}