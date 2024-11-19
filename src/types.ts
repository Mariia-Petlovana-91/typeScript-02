export interface UnsplashImage {
    id: string;
    alt_description: string | null;
    urls: {
        full: string;
        regular: string;
        small: string;
	} ;
    user: {
	    first_name: string;
	    last_name: string;
          profile_image: {
            small: string;
        };
	};
    likes: number;
	links: string;
}