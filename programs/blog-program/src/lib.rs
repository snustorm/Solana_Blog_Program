use anchor_lang::prelude::*;

declare_id!("8ggGfcDQLdvC5iX7drVqPZmmBJrwgBd2WRDVuKyC8n2b");

#[program]
mod blog_program {
    use super::*;

    pub fn create_blog(
        ctx: Context<CreateBlog>, 
        title: String, 
        content: String, 
        image_url: String,
        location: String,
    ) -> Result<()> {
        let blog = &mut ctx.accounts.blog;
        let author = &ctx.accounts.author;

        // Assign values to the blog struct fields
        blog.author = *author.key;
        blog.title = title.clone(); // Clone title to store in the Blog account
        blog.content = content;
        blog.created_at = Clock::get()?.unix_timestamp;
        blog.updated_at = Clock::get()?.unix_timestamp;
        blog.image_url = image_url;
        blog.location = location;

        Ok(())
    }

    pub fn update_blog(ctx: Context<UploadBlog>,
        title: String,
         content: String,
         location: String,
     ) -> Result<()> 
    {
        let blog = &mut ctx.accounts.blog;
        blog.title = title;
        blog.content = content;
        let current_time = Clock::get()?.unix_timestamp;
        blog.location = location;
        blog.updated_at = current_time;
        Ok(())
    }

    //删除一个博客
    pub fn delete_blog(ctx: Context<DeleteBlog>) -> Result<()> {
        let blog = &mut ctx.accounts.blog;

        //Ensure only the author can delete their blog
        if blog.author != *ctx.accounts.author.key {
            return Err(ErrorCode::Unauthorized.into());
        }
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateBlog<'info> {
    #[account(
        init,
        payer = author,
        space = 8 + 4 + TITLE_LENGTH + 4 + CONTENT_LENGTH + 4 + IMAGE_URL_LENGTH + 4 + LOCATION_LENGTH + 32 + 8 + 8,
        seeds = [b"data", author.key().as_ref()],  // Correctly reference the title seed
        bump
    )]
    pub blog: Account<'info, Blog>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UploadBlog<'info> {
    #[account(mut, 
            has_one = author,
            seeds = [b"data", author.key().as_ref()],
            bump
        )]
    pub blog: Account<'info, Blog>,
    #[account(mut)]
    pub author: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteBlog<'info> {
    #[account(mut, 
            has_one = author, 
            close = author,
            seeds = [b"data", author.key().as_ref()],
            bump
    )]
    pub blog: Account<'info, Blog>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct Blog {
    pub author: Pubkey,
    pub title: String,
    pub content: String,
    pub created_at: i64,
    pub updated_at: i64,
    pub image_url: String,
    pub location: String,
}

const TITLE_LENGTH: usize = 20; // Maximum length for title
const CONTENT_LENGTH: usize = 100; // Maximum length for content
const IMAGE_URL_LENGTH: usize = 30; // Maximum length for image URL
const LOCATION_LENGTH: usize = 20; // Maximum length for image URL


#[error_code]
pub enum ErrorCode {
    #[msg("You don't have permission to perform this action")]
    Unauthorized,
}