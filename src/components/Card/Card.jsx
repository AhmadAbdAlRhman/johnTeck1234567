import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // استيراد المكون
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"; // استيراد الأيقونات
import "./Card.css";
import InfoProd from "../InsertInfoProduct/InfoProd";
import { Delete } from "../Delete/Delete";
import Standard from "../BtnStand/Stander";

const Card = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // حالة المنتج المختار
  const openModal = (product = null) => {
    setModalIsOpen(true);
    if (product) {
      setSelectedProduct(product); // تمرير بيانات المنتج
    } else {
      setSelectedProduct({ name: "", Description: "", Image: "", pdf: "" }); // فتح المودال لإضافة منتج جديد
    }
  };
  const closeModal = () => setModalIsOpen(false);

  // عرض البيانات من الداتا
  const [productinfo, setproductInfo] = useState([]);
  const getType = async () => {
    const response = await axios.get("https://johntekvalves.com/backend/api/products");
    setproductInfo(response.data);
  };

  useEffect(() => {
    getType();
  }, []);

  // تعريف دوال فتح وإغلاق المودال للحذف
  const [modalOpen, setModalOpen] = useState(false);
  const opendelete = (product) => {
    console.log(product);
    setSelectedProduct(product);
    setModalOpen(true);
  };
  const closedelete = () => setModalOpen(false);

  const showname = productinfo?.map((i) => (
    <div key={i.id} className="card">
      
      <img
        className="imageDashboard"
        src={`https://johntekvalves.com/backend/storage/products/images/${i.image}`}
        alt="Product Imag"
      />
      <div className="productdetails">
        <h1 className="productName">{i.EnglishName}</h1>
        <div className="PI">
          <p className="productdeDescription">{i.EnglishDescription}</p>
          <div>
          <a href={`https://johntekvalves.com/backend/storage/products/pdfs/${i.pdf}`} target="_blank"
              rel="noopener noreferrer">
            <img
              className="pdfuser"
              src={require("../../Assets/images__3_-removebg-preview.png")}
              alt="Product PDF"
            />
          </a>
          {i.standard !== "no information" && (
                <Standard standardData={i.standard} />
          )}
          </div>
        </div>
      </div>
      <div className="icons">
        <div className="iconimage" onClick={() => openModal(i)}>
          <FontAwesomeIcon icon={faEdit} size="4x" />
        </div>
        <p className="nameicons1">Edit</p>
        <div className="iconimage" onClick={() => {opendelete(i);}}>
          <FontAwesomeIcon icon={faTrash} size="4x" />
        </div>
        <p className="nameicons2">Delete</p>
      </div>
    </div>
  ));
  const addProductToList = (newProduct) => {
    setproductInfo((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div>
      {showname}
      <Modal
        isOpen={modalIsOpen}
        contentLabel="Product Modal"
        className="popupWindow"
        overlayClassName="modal-overlay"
      >
        {selectedProduct && (
          <InfoProd
            h1={selectedProduct.id ? "Update the Product" : "Add a New Product"}
            EnglishName={selectedProduct.EnglishName}
            DescriptionEn={selectedProduct.EnglishDescription}
            DescriptionTr={selectedProduct.TurkishDescription}
            DescriptionAr={selectedProduct.ArabicDescription}
            standard={selectedProduct.standard}
            image={selectedProduct.image}
            pdf={selectedProduct.pdf}
            endApi={
              selectedProduct.id
                ? `updateProduct/${selectedProduct.id}`
                : "storage"
            }
            closeModal={closeModal}
            getType={getType}
            addProductToList={addProductToList} // نمرر هذه الدالة لإضافة المنتج الجديد للقائمة
          />
        )}
      </Modal>
      <Modal
        isOpen={modalOpen}
        contentLabel="delete Product Modal"
        className="popupWindow"
        overlayClassName="modal-overlay"
      >
        {selectedProduct && (
          <>
            <Delete
              closedelete={closedelete}
              id={selectedProduct.id}
              getType={getType}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default Card;
