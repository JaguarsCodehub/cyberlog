import { parse } from 'tldts';

function filterByTLD(data: string) {
    const lines = data.trim().split('\n');
    const result: Record<string, string[]> = {};

    lines.forEach(line => {
        try {
            // Split the line by colon (:) and ensure all required fields are present
            const [id, protocol, url, email, password] = line.split(':');
            if (!id || !protocol || !url || !email || !password) return; // Skip invalid or incomplete lines

            // Remove // from the start of the URL if present
            let cleanUrl = url.trim();
            if (cleanUrl.startsWith('//')) cleanUrl = cleanUrl.slice(2);

            const parsedUrl = parse(cleanUrl);

            if (parsedUrl.domain) {
                const tld = parsedUrl.domain;

                // Initialize array for the TLD if it doesn't exist
                if (!result[tld]) result[tld] = [];

                // Store the raw line under the appropriate TLD
                result[tld].push(line);
            }
        } catch (error) {
            console.error(`Error processing line: ${line}`, error);
        }
    });

    return result;
}

export default filterByTLD;
