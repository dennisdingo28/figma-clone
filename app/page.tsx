"use client"
import { fabric } from "fabric"
import LeftSidebar from "@/components/LeftSidebar";
import { Live } from "@/components/Live";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/Rightsidebar";
import { ActiveElement, CustomFabricObject } from "@/types/type";
import { useEffect, useRef, useState } from "react";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib/canvas";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>('rectangle');

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name:'',
    value:'',
    icon:'',
  });

  const handleActiveElement = (element: ActiveElement) =>{
    setActiveElement(element); 
    selectedShapeRef.current=element?.value as string;

  }

  useEffect(()=>{
    const canvas = initializeFabric({canvasRef, fabricRef}); 

    canvas.on("mouse:down", (options) =>{
      handleCanvasMouseDown({options, canvas, isDrawing, shapeRef, selectedShapeRef});
    });

    window.addEventListener("resize", ()=>{
      handleResize({fabricRef});
    });
  }, []);

  return (
    <main className="h-screen overflow-hidden">
      <h1 className="text-2xl text-white">test</h1>
      <Navbar activeElement={activeElement} handleActiveElement={handleActiveElement}/>
      <section className="flex h-full flex-row">
        <LeftSidebar/>
        <Live canvasRef={canvasRef}/>
        <RightSidebar/>
      </section>
    </main>
  );
}