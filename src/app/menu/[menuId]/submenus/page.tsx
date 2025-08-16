/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmenusAction } from "@/app/redux/action/menu/collection";
import { RootState, AppDispatch } from "@/app/redux/store";

export default function SubmenusPage() {
  const { menuId } = useParams<{ menuId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { submenus, loading, error } = useSelector(
    (state: RootState) => state.collection // 👈 adjust reducer key if different
  );

  useEffect(() => {
    if (menuId) {
      dispatch(fetchSubmenusAction(menuId));
    }
  }, [dispatch, menuId]);

  if (loading) return <p>Loading submenus...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submenus for {menuId}</h1>
      {submenus?.length > 0 ? (
        <ul className="space-y-2">
          {submenus.map((sub: any) => (
            <li key={sub._id} className="p-2 border rounded">
              <p className="font-semibold">{sub.name}</p>
              <p className="text-sm text-gray-600">{sub.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No submenus available.</p>
      )}
    </div>
  );
}
