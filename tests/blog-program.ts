import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BlogProgram } from "../target/types/blog_program";
import { PublicKey } from "@solana/web3.js";

describe("blog-program", () => {
  // Configure the client to use the local cluster.
  
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BlogProgram as Program<BlogProgram>;

  const author = provider.wallet.publicKey;
  let blogPda: PublicKey;
  let bump: number;

  before(async () => {
    [blogPda, bump] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("data"), author.toBuffer()],
        program.programId
    );
  });


  it("Create a new blog!", async () => {
    
    const title = "My First Blog";
    const content = "This is the content of my first blog.";
    const imageUrl = "https://example.com/image.png";
    const location = "Canada";

    //Execute the create_blog function
    const tx = await program.methods.createBlog(title, content, imageUrl, location)
        .accounts({
            blog: blogPda,
            author: author,
            systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();


    console.log("Blog create with PDA: ", blogPda.toString());
    console.log("Create blog transaction signatures:", tx);

    const blogData = await program.account.blog.fetch(blogPda);

    console.log("Blog Title: ", blogData.title);
    console.log("Blog Content: ", blogData.content);
    console.log("Blog Image Url: ", blogData.imageUrl);
    console.log("Blog Author:", blogData.author.toBase58());
    
  });

  it("Updates the blog!", async () => {
    const newTitle = "Updated Blog Title";
    const newContent = "This is the updated content.";
    const newLocation = "China";

    // Execute the update_blog function
    await program.methods
      .updateBlog(newTitle, newContent, newLocation)
      .accounts({
        blog: blogPda,
        author: author,
      })
      .rpc();

    console.log("Blog updated with PDA:", blogPda.toString());
  });


  it("Deletes the blog!", async () => {
    // Execute the delete_blog function
    await program.methods
      .deleteBlog()
      .accounts({
        blog: blogPda,
        author: author,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Blog deleted with PDA:", blogPda.toString());
  });
});
