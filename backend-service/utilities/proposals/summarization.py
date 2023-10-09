from .final_genAI import getText

def summarize(filepath):

    proposal = getText(filepath)
    
    from transformers import T5Tokenizer, T5ForConditionalGeneration
    model = T5ForConditionalGeneration.from_pretrained("t5-base")
    tokenizer = T5Tokenizer.from_pretrained("t5-base")
    source = tokenizer.batch_encode_plus([proposal], max_length=512, pad_to_max_length=True,return_tensors='pt')
    source_ids = source['input_ids']
    source_mask = source['attention_mask']
    generated_ids = model.generate(
        input_ids = source_ids,
        attention_mask = source_mask, 
        max_length=150, 
        num_beams=2,
        repetition_penalty=2.5, 
        length_penalty=1.0, 
        early_stopping=True
        
    )
    preds = [tokenizer.decode(g, skip_special_tokens=True, clean_up_tokenization_spaces=True) for g in generated_ids]
    print(preds)
    
    return preds
