# **MediScan – Secure Medicine Verification System**

MediScan is a full-stack web application designed to enhance consumer safety by enabling instant verification of medicines using **secure QR codes**. The system helps users identify genuine, expired, or counterfeit medicines while providing pharmaceutical manufacturers a safe portal for managing medicine data.

---

## **🔍 Features**

### **For Users**

* Upload and scan **secure QR codes** on medicine strips
* Instantly verify:

  * ✔️ Genuine medicines
  * ⚠️ Expired medicines
  * ❌ Fake/counterfeit medicines
* View complete medicine details (name, ingredient, use, side effect and price)

### **For Admins**

* Secure login with **bcrypt-hashed passwords**
* Add new medicine records
* Automatic **UUID generation**
* Generate QR codes using goQR API
* Manage and update medicine data in the database

---

## **🛠️ Tech Stack**

### **Frontend**

* React.js
* JavaScript
* HTML & CSS
* jsQR (QR decoding)
* Axios (API communication)

### **Backend**

* Node.js
* Express.js
* PostgreSQL
* UUID module
* bcrypt.js
* dotenv
* CORS & body-parser

---

## **📌 How It Works**

1. User uploads a QR code image
2. jsQR decodes and extracts the **UUID**
3. UUID is sent to backend via Axios
4. Backend checks PostgreSQL database
5. Returns medicine details **if valid**, or a **fake medicine alert**

Admin Flow:

1. Admin logs in (secure hashing)
2. Adds medicine details
3. System generates UUID
4. QR code generated via goQR API
5. Stored in centralized database

---

## **🚀 Getting Started**

### **Clone the Repository**

```bash
git clone https://github.com/Vibha-1802/mediScan-expiryChecker.git
cd mediscan
```

### **Install Frontend Dependencies**

```bash
cd frontend
npm install
npm run dev
```

### **Install Backend Dependencies**

```bash
cd backend
npm install
node server.js
```

---

## **🔐 Environment Variables (.env)**

Backend `.env` should include:

```
PG_USER= "postgres"
PG_HOST= "localhost"
PG_DATABASE= "postgres"
PG_PASSWORD="your_password"
PG_PORT= 5432
CORS_ORIGIN_URL=http://localhost:5173
```

---

## **📸 Video prototype**

https://github.com/user-attachments/assets/b4a35345-72d4-4702-aad2-d7ad744c6a8f

---

## **🧪 Testing**

* Admin login validation
* QR decoding accuracy
* Fake/expired/genuine medicine detection
* API response validation

---

## **📘 Conclusion**

MediScan improves public safety by enabling **secure QR-based medicine verification**, helping users avoid fake or expired medicines while enhancing transparency in the pharmaceutical supply chain.

