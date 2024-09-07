"use client"

// Essentials
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

// Contexts
import { useResultsContext } from "./(contexts)/Results";

// Hooks
import useArtRequestForm from "./(hooks)/useArtRequestForm";

// Models
import { artRequestFormDefault } from "../models/ArtRequestForm";

// Components: UI
import * as Form from "@radix-ui/react-form";
import RadioButtons from "./(components)/ui/Radio/RadioButtons";
import RadioButton from "./(components)/ui/Radio/RadioButton";
import Slider from "./(components)/ui/Slider/Slider";
import TextArea from "./(components)/ui/TextArea/TextArea";
import TextField from "./(components)/ui/TextField/TextField";
import Button from "./(components)/ui/Button/Button";
import Image from "next/image";

const Home: NextPage = () => {
  const { formData, setFormData, handleChange } = useArtRequestForm();
  const { setArtRequestForm } = useResultsContext();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Default the states on navigation.
  useEffect(() => {
    setArtRequestForm(null);
  }, [router]);

  // Default the prompts and bulk amount on production switch.
  useEffect(() => {
    setFormData({
      ...formData,
      bulkAmount: artRequestFormDefault.bulkAmount,
      prompts: [formData.prompts[0]]
    });
  }, [formData.production]);

  // Add new prompt.
  const addNewPromptSet = () => {
    setFormData({
      ...formData,
      prompts: [...formData.prompts, artRequestFormDefault.prompts[0]]
    })
  }

  // Handle submission.
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setArtRequestForm(formData);
    
    // Set cookie for access to results page.
    const formDataString = JSON.stringify(formData);
    document.cookie = `artRequestForm=${encodeURIComponent(formDataString)}; path=/`;
    
    router.push("/results");
    setLoading(false);
  };

  return (
    <div className="p-Home">
      <div className="p-Home__logo">
        <Image src="/logo.png" alt="logo" layout="fill" objectFit="contain" />
      </div>
      <Form.Root onSubmit={handleSubmit} className="p-Home__form">
        <div className="p-Home__formSection">
          <h5 className="p-Home__headline">AI Model</h5>
          <RadioButtons name="model" defaultValue="zappy" onChange={handleChange}>
            <RadioButton value="zappy" id="model_zappy">
              Zappy
            </RadioButton>
            <RadioButton value="masterpiece" id="model_masterpiece">
              Masterpiece
            </RadioButton>
          </RadioButtons>
        </div>
        <div className="p-Home__formSection">
          <h5 className="p-Home__headline">Production Type</h5>
          <RadioButtons name="production" defaultValue="bulk" onChange={handleChange}>
            <RadioButton value="bulk" id="production_bulk">
              Bulk Generation
            </RadioButton>
            <RadioButton value="queue" id="production_queue">
              Queue Generation
            </RadioButton>
          </RadioButtons>
        </div>
        <div className="p-Home__formSection">
          {
            formData.production === "bulk" && <>
              <h5 className="p-Home__headline">Number of Production</h5>
              <Slider
                name="bulkAmount"
                className="p-Home__bulkAmount"
                onChange={handleChange}
                defaultValue={[artRequestFormDefault.bulkAmount]}
                min={0}
                max={10}
                step={5}
              />
              <div className="p-Home__bulkAmount-labels">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </>
          }
        </div>
        <div className="p-Home__formSection">
          <h5 className="p-Home__headline">Prompt Area</h5>
          <div className="p-Home__promptSets">
            {
              formData.prompts.map((prompt, promptIndex) => (
                <div key={promptIndex} className="p-Home__promptSet">
                  <TextArea
                    name={`prompt-${promptIndex}`}
                    required
                    placeholder="A cute rabbit, white background, pastel hues, minimal illustration, line art, pen drawing"
                    valueMissing="Please enter a prompt."
                    value={prompt.prompt}
                    onChange={(e) => handleChange(e, promptIndex)}
                  />
                  <TextField
                    name={`style-${promptIndex}`}
                    placeholder="Style (optional)"
                    value={prompt.style}
                    onChange={(e) => handleChange(e, promptIndex)}
                  />
                  {
                    promptIndex !== 0 &&
                    <Button name="deletePrompt" className="remove" onClick={(e) => handleChange(e, promptIndex)}>
                      Remove
                    </Button>
                  }
                </div>
              ))
            }
          </div>
          {
            formData.production === "queue" &&
            <Button onClick={addNewPromptSet} className="add">+Add Prompt to Queue</Button>
          }
        </div>
        <Button type="submit" className={`main ${loading ? "loading" : ""}`} disabled={loading}>
          {
            loading
              ? <>•••</>
              : <>Generate</>
          }
        </Button>
      </Form.Root>
    </div>
  )
}

export default Home;