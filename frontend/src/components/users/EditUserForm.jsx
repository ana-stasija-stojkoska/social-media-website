import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

const EditUserForm = ({ initialData, onClose }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    city: initialData.city || "",
    profilepicture: initialData.profilepicture || "",
  });

  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user", data.userid]);

      if (user?.userid === data.userid) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      }

      onClose(); 
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-base-100 rounded p-5 mb-4">
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          name="name"
          type="text"
          className="input input-bordered w-full"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">City</label>
        <input
          name="city"
          type="text"
          className="input input-bordered w-full"
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Profile Picture URL</label>
        <input
          name="profilepicture"
          type="text"
          className="input input-bordered w-full"
          value={formData.profilepicture}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button type="submit" className="btn btn-primary" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save"}
        </button>
        <button type="button" className="btn btn-error" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;