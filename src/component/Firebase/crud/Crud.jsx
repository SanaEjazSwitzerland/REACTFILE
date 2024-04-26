import { db } from "../../../config/firebase-config";
import { collection, doc, addDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import { useState, useEffect } from "react";

const Docadd = async (prop) => {
    try {
        console.log('add called')
        console.log(prop)
        const docRef = await addDoc(collection(db, "users"), {
            email: prop.email,
            // Add other fields as needed
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

const Docread = () => {
    const [data, setData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editDocId, setEditDocId] = useState('');
    const [editEmail, setEditEmail] = useState('');
      
    useEffect(() => {
        const read = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                setData(querySnapshot.docs);
            } catch (e) {
                console.error("Error reading documents: ", e);
            } 
        };
        read();
    }, []);

    const handleDelete = async (docId) => {
        try {
            await deleteDoc(doc(db, "users", docId));
            console.log("Document deleted successfully");
            // Refresh data after deletion
            const querySnapshot = await getDocs(collection(db, "users"));
            setData(querySnapshot.docs);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const handleEdit = (docId, email) => {
        // Set the current email for editing
        setEditEmail(email);
        setEditDocId(docId);
        setShowEditModal(true);
    };

    const handleRead = (docId) => {
        // Implement read functionality here
        console.log("Read button clicked for document ID: ", docId);
    };

    const handleAddModalClose = () => {
        setShowAddModal(false);
        setNewEmail('');
    };

    const handleAddModalSubmit = () => {
        setShowAddModal(false);
        Docadd({ email: newEmail });
        setNewEmail('');
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
        setEditEmail('');
        setEditDocId('');
    };

    const handleEditModalSubmit = () => {
        setShowEditModal(false);
        // Implement edit functionality here
        console.log("Edit button clicked for document ID: ", editDocId, "with email: ", editEmail);
        // You can call a function to update the document in the database with the new email
        setEditEmail('');
        setEditDocId('');
    };

    return (
        <>
            <button onClick={() => setShowAddModal(true)}>Add</button>
            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleAddModalClose}>&times;</span>
                        <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        <button onClick={handleAddModalSubmit}>Submit</button>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleEditModalClose}>&times;</span>
                        <input type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                        <button onClick={handleEditModalSubmit}>Submit</button>
                    </div>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.data().email}</td>
                            <td>
                                <button onClick={() => handleEdit(item.id, item.data().email)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                                <button onClick={() => handleRead(item.id)}>Read</button>
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </>
    );
};

const Docdelete = async (docId) => {
    try {
        await deleteDoc(doc(db, "users", docId));
        console.log("Document deleted successfully");
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};

export { Docadd, Docread, Docdelete };
