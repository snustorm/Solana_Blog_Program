import { Connection, PublicKey, clusterApiUrl, Keypair, SystemProgram } from "@solana/web3.js";
import { Program, Provider, web3} from '@project-serum/anchor';
import idl from '../../target/idl/blog_program.json';
import { AnchorProvider } from "@coral-xyz/anchor";


const programID = new PublicKey("8ggGfcDQLdvC5iX7drVqPZmmBJrwgBd2WRDVuKyC8n2b");
const network = clusterApiUrl('devnet');
const opts = { preflightCommitment: 'processed'};
const wallet = Keypair.generate();

export const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(connection, wallet, opts);
    return provider;
}

export const createBlog = async (title: string, content: string, imageUrl: string, location: string) {

    const provider = getProvider();
    const program = new Program(idl, programID, provider);

    try {
        const [blogPDA] = await PublicKey.findProgramAddress(
            [Buffer.from('data'), provider.wallet.publicKey.toBuffer()],
            programID
        );

        await program.methods.createBlog(title, content, imageUrl, location)
            .accounts({
                blog: blogPDA,
                author: provider.wallet.publicKey,
                systemProgram: web3.SystemProgram.programId,
            })
            .rpc();

        return { success: true, message: 'Blog created successfully!'};
    } catch (error) {
        console.error('Error creating blog', error);
        return { success: false, message: 'Failed to create blog'};
    }

}